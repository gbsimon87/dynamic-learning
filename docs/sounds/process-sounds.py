"""
Rebuilds public/sounds/*.mp3 from the original Mixkit WAVs.

  1. Download the originals (full quality, not the previews):
       mkdir -p raw && for id in 2870 2020 2014 946 3062 1938 2064 600 2633 2317 2063 2059 226; do
         curl -sSL -o raw/$id.wav https://assets.mixkit.co/active_storage/sfx/$id/$id.wav; done
  2. python3 docs/sounds/process-sounds.py raw

Needs ffmpeg (brew install ffmpeg). Each file is trimmed of leading and
trailing silence, given a 5ms fade-in and 150ms fade-out, and gain-matched to
its tier's loudness, with a limiter keeping peaks under -1 dBFS.

To replace a sound: change its Mixkit id in PLAN, download that WAV into the
raw folder, re-run. The file name (and so the cue in cues.js) stays the same.
"""
import subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from measure import measure

RAW = sys.argv[1] if len(sys.argv) > 1 else "raw"
OUT = str(Path(__file__).resolve().parents[2] / "public" / "sounds")
# file name in public/sounds, Mixkit id, target loudness (LUFS)
PLAN = [
  ("correct", 2870, -20), ("correct-last", 2020, -20), ("combo", 2014, -20),
  ("wrong", 946, -24), ("progress", 3062, -20), ("practice", 1938, -20),
  ("unlock", 2064, -20), ("success", 600, -18), ("sticker", 2633, -18),
  ("badge", 2317, -18), ("topic", 2063, -16), ("quest", 2059, -16),
  ("subject-year", 226, -16),
]
for name, mid, target in PLAN:
    m = measure(f"{RAW}/{mid}.wav")
    start = m["lead"]; end = min(m["dur"], m["audible_end"] + 0.15); length = end - start
    gain = target - m["lufs"]
    af = (f"atrim=start={start}:end={end},asetpts=PTS-STARTPTS,"
          f"volume={gain}dB,alimiter=limit=0.89:level=false,"
          f"afade=t=in:st=0:d=0.005,afade=t=out:st={max(0, length-0.15):.3f}:d=0.15")
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",f"{RAW}/{mid}.wav","-af",af,
                    "-ar","44100","-c:a","libmp3lame","-b:a","128k",f"{OUT}/{name}.mp3"], check=True)
for name, mid, target in PLAN:
    r = measure(f"{OUT}/{name}.mp3")
    print(f"{name:13} #{mid:<5} target {target}  got {r['lufs']:6.1f} LUFS  peak {r['tp']:5.1f} dBTP  {r['dur']}s")
