"""Measures a sound file: duration, loudness (LUFS), true peak, and where the audible part starts and ends. Used by process-sounds.py; also runnable alone: python3 measure.py "public/sounds/*.mp3"."""
import subprocess, re, json, sys, glob
def run(args): return subprocess.run(args, capture_output=True, text=True).stderr
def measure(f):
    out = run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af","loudnorm=print_format=json","-f","null","-"])
    j = json.loads(out[out.rindex("{"):out.rindex("}")+1])
    sil = run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af","silencedetect=n=-55dB:d=0.03","-f","null","-"])
    starts=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",sil)]
    ends=[float(x) for x in re.findall(r"silence_end: ([\d.]+)",sil)]
    dur=float(re.search(r"Duration: (\d+):(\d+):([\d.]+)",sil).groups()[2])
    lead = ends[0] if starts and starts[0] < 0.01 and ends else 0.0
    tail = starts[-1] if starts and (not ends or len(ends)<len(starts) or abs(ends[-1]-dur)<0.02) and starts[-1]>0.01 else dur
    ch = re.search(r"Audio: \w+.*?(\d+) Hz, (\w+)", sil)
    return dict(file=f, dur=round(dur,2), lufs=float(j["input_i"]), tp=float(j["input_tp"]), lead=round(lead,3), audible_end=round(tail,3), rate=ch.group(1), ch=ch.group(2))
if __name__=="__main__":
    for f in sorted(glob.glob(sys.argv[1])): print(measure(f))
