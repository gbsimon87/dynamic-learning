import { useRef, useState } from "react";

/**
 * "Put the star in Bix's basket" — the intro's dragging lesson, with three
 * ways to do it so nobody is stuck:
 *   drag   pointer down on the star, move it over the basket, let go
 *   tap    tap the star, then tap the basket
 *   keys   arrow keys walk the star along the track, Enter drops it in
 * The track has STOPS positions; the basket is the last one.
 */
const STOPS = 5;
const BASKET = STOPS - 1;

export default function StarBasket({ dropped, onDrop }) {
  const [position, setPosition] = useState(0);
  const [picked, setPicked] = useState(false);
  const [dragX, setDragX] = useState(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  // A drag ends with a click on the star too; that click must not "pick" it.
  const suppressClickRef = useRef(false);

  const stopAt = (clientX) => {
    const box = trackRef.current?.getBoundingClientRect();
    if (!box) return 0;
    const fraction = Math.min(Math.max((clientX - box.left) / box.width, 0), 0.999);
    return Math.floor(fraction * STOPS);
  };

  const drop = () => {
    setPosition(BASKET);
    setPicked(false);
    setDragX(null);
    onDrop();
  };

  const onPointerDown = (event) => {
    if (dropped) return;
    dragRef.current = { id: event.pointerId, startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (Math.abs(event.clientX - drag.startX) > 8) drag.moved = true;
    if (!drag.moved) return;
    const box = trackRef.current.getBoundingClientRect();
    setDragX(Math.min(Math.max(event.clientX - box.left, 0), box.width));
  };

  const onPointerUp = (event) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.id !== event.pointerId) return;
    if (!drag.moved) return; // a plain tap: the click handler picks it up
    suppressClickRef.current = true;
    if (stopAt(event.clientX) === BASKET) drop();
    else {
      setPosition(stopAt(event.clientX));
      setDragX(null);
    }
  };

  const onStarClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (dropped) return;
    setPicked((value) => !value);
  };

  const onKeyDown = (event) => {
    if (dropped) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => Math.min(value + 1, BASKET));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => Math.max(value - 1, 0));
    } else if ((event.key === "Enter" || event.key === " ") && position === BASKET) {
      event.preventDefault();
      drop();
    }
  };

  const left = dragX !== null ? `${dragX}px` : `${((position + 0.5) / STOPS) * 100}%`;
  const atBasket = position === BASKET;

  return (
    <div className="star-basket">
      <div className="star-basket-track" ref={trackRef}>
        <button
          type="button"
          className={`star-basket-basket ${picked ? "is-ready" : ""} ${dropped ? "is-full" : ""}`}
          onClick={() => picked && drop()}
          disabled={dropped || !picked}
          aria-label={dropped ? "Bix's basket, with the star in it" : "Bix's basket"}
        >
          <span aria-hidden="true">🧺</span>
        </button>
        {!dropped && (
          <button
            type="button"
            className={`star-basket-star ${picked ? "is-picked" : ""} ${dragX !== null ? "is-dragging" : ""}`}
            style={{ left }}
            aria-label={atBasket ? "The star is over the basket. Press Enter to drop it in." : "The star. Use the arrow keys to move it to the basket."}
            aria-pressed={picked}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { dragRef.current = null; setDragX(null); }}
            onClick={onStarClick}
            onKeyDown={onKeyDown}
          >
            <span aria-hidden="true">⭐</span>
          </button>
        )}
      </div>
      <p className="star-basket-help">
        {dropped
          ? "In it goes!"
          : picked
            ? "Now tap the basket!"
            : (
              <>
                Drag the star to the basket — or tap the star, then the basket.
                <span className="star-basket-keys"> On a keyboard: arrow keys, then Enter.</span>
              </>
            )}
      </p>
    </div>
  );
}
