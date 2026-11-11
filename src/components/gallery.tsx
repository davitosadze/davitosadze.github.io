'use client';
import { useRef, useState } from 'react';
import { ScreenshotImage } from './screenshot-image';
import { galleryScreenshots, type GameScreen } from '@/config/screenshots';
import { GameScreenshot } from './game-screenshot';
import { SectionHeading } from './section-heading';
import { Icon } from './icons';
export function ScreenshotGallery() {
  const [selected, setSelected] = useState<GameScreen | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const available = galleryScreenshots;
  function close() {
    dialog.current?.close();
  }
  function move(direction: number) {
    if (!selected) return;
    setSelected(
      available[
        (available.findIndex((s) => s.id === selected.id) + direction + available.length) %
          available.length
      ],
    );
  }
  return (
    <section className="section gallery-section" id="screenshots">
      <div className="gallery-heading">
        <SectionHeading
          eyebrow="A PEEK INSIDE"
          title={
            <>
              Your next little
              <br className="desktop-break" /> obsession.
            </>
          }
        >
          A world of glass, gold, and just the right amount of challenge.
        </SectionHeading>
        <div className="gallery-controls">
          <button
            aria-label="Scroll screenshots left"
            onClick={() => track.current?.scrollBy({ left: -320, behavior: 'smooth' })}
          >
            <Icon name="arrow" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button
            aria-label="Scroll screenshots right"
            onClick={() => track.current?.scrollBy({ left: 320, behavior: 'smooth' })}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <h3 className="gallery-subtitle">
        Inside Balance Keeper{' '}
        <span>{String(available.length).padStart(2, '0')} glimpses of the game</span>
      </h3>
      <div
        className="gallery-track"
        ref={track}
        role="region"
        aria-label="Game screenshot gallery"
        tabIndex={0}
      >
        {available.map((screen, index) => (
          <figure key={screen.id} className="gallery-item">
            {screen.src ? (
              <button
                className="screenshot-open"
                aria-label={`Enlarge ${screen.caption} screenshot`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(screen);
                  dialog.current?.showModal();
                  document.body.style.overflow = 'hidden';
                }}
              >
                <GameScreenshot id={screen.id} />
                <span className="expand-icon">
                  <Icon name="expand" size={18} />
                </span>
              </button>
            ) : (
              <GameScreenshot id={screen.id} />
            )}
            <figcaption>
              <span>0{index + 1}</span>
              <div>
                <strong>{screen.caption}</strong>
                <p>{screen.title}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-note">
        {available.length
          ? 'Cropped from the supplied store images. Select a screen for a closer look.'
          : 'The real game, soon in view. Official screenshots are on their way.'}
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={selected ? `${selected.caption} screenshot` : 'Game screenshot'}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onClose={() => {
          document.body.style.overflow = '';
          opener.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') move(1);
          if (event.key === 'ArrowLeft') move(-1);
          if (event.key === 'Tab') {
            const buttons = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
            );
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <div className="lightbox-inner">
          <button className="lightbox-close" aria-label="Close screenshot" onClick={close}>
            <Icon name="close" />
          </button>
          {selected && (
            <>
              <ScreenshotImage screen={selected} expanded />
              <div className="lightbox-caption">
                <button
                  onClick={() => move(-1)}
                  aria-label="Previous screenshot"
                  disabled={available.length < 2}
                >
                  <Icon name="arrow" style={{ transform: 'rotate(180deg)' }} />
                </button>
                <span>{selected.caption}</span>
                <button
                  onClick={() => move(1)}
                  aria-label="Next screenshot"
                  disabled={available.length < 2}
                >
                  <Icon name="arrow" />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
