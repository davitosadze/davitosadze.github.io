import Image from 'next/image';
import { Brand } from './brand';
import { PlayButton } from './play-button';
import { Icon } from './icons';
import { SectionHeading } from './section-heading';
import { GameScreenshot } from './game-screenshot';
import { getScreenshot } from '@/config/screenshots';

export function Hero() {
  const heroScreen = getScreenshot('gameplay');
  return (
    <section className="hero" id="game">
      <div className="hero-content">
        <div className="release-pill">
          <span /> A LITTLE PUZZLE. A LOVELY CHALLENGE.
        </div>
        <div className="hero-wordmark">
          <Brand large />
        </div>
        <h1>
          Small Moves.
          <br />
          <em>Big Balance.</em>
        </h1>
        <p className="hero-description">
          Find the right combination of weights, balance every bottle, and master increasingly
          challenging puzzles.
        </p>
        <div className="hero-actions">
          <PlayButton />
          <a className="text-button" href="#gameplay">
            <span className="play-circle">
              <Icon name="play" size={13} />
            </span>
            See gameplay
          </a>
        </div>
        <p className="android-note">
          <span className="android-dot" /> Crafted for Android. Coming to Google Play.
        </p>
      </div>
      <div className="hero-art">
        {heroScreen.src ? (
          <div className="hero-screenshot">
            <GameScreenshot id="gameplay" priority />
          </div>
        ) : (
          <>
            <Image
              src="/images/backgrounds/workshop.svg"
              alt="Decorative illustration of glassware and colorful balls in a warm mountain-side workshop; not a game screenshot"
              width={800}
              height={820}
              preload
              className="workshop-art"
            />
            <span className="art-caption">WORKSHOP ILLUSTRATION · GAME SCREENS COMING SOON</span>
          </>
        )}
        <div className="art-note">
          <span className="note-star">✧</span>
          <span>
            A little thought.
            <br />
            <em>A perfect balance.</em>
          </span>
        </div>
      </div>
      <a href="#how-to-play" className="scroll-cue">
        <span>STEP INTO THE WORKSHOP</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
export function FeatureRibbon() {
  return (
    <div className="feature-ribbon">
      <div>
        <Icon name="bottle" />
        <span>Small moves, thoughtful puzzles</span>
      </div>
      <span className="ribbon-star" aria-hidden="true">
        ✧
      </span>
      <div>
        <Icon name="star" />
        <span>50 levels to make your own</span>
      </div>
      <span className="ribbon-star" aria-hidden="true">
        ✧
      </span>
      <div>
        <Icon name="leaf" />
        <span>A world with a warmer feel</span>
      </div>
    </div>
  );
}
function StepArt({ step }: { step: number }) {
  if (step === 1)
    return (
      <div className="step-art weight-art" aria-hidden="true">
        <span className="weight-ball green-ball">
          4<small>kg</small>
        </span>
        <span className="weight-ball gold-ball">
          10<small>kg</small>
        </span>
        <span className="small-spark">✧</span>
      </div>
    );
  return (
    <div className={`step-art bottle-art ${step === 3 ? 'cracked-art' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 170 130" fill="none">
        <path
          d="M68 16h34v28l21 24v41a8 8 0 0 1-8 8H55a8 8 0 0 1-8-8V68l21-24Z"
          fill={step === 2 ? '#d9e1cc' : '#ede2cd'}
          stroke={step === 2 ? '#78926d' : '#b8906c'}
          strokeWidth="2"
        />
        <path
          d="M64 16h42M58 75v23"
          stroke={step === 2 ? '#78926d' : '#b8906c'}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {step === 2 ? (
          <>
            <circle cx="71" cy="98" r="13" fill="#82975a" />
            <circle cx="98" cy="94" r="16" fill="#d5a249" />
            <path d="m121 36 7 7 13-16" stroke="#6d8155" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="m91 47-11 20 12 10-14 18 9 22" stroke="#a87653" strokeWidth="2" />
            <path
              d="m132 51 9-5m-9 24h13M38 51l-9-5"
              stroke="#bd936e"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}
export function HowToPlay() {
  const steps = [
    {
      title: 'Choose your weight',
      body: 'Look at the available weighted balls and bottle capacities.',
    },
    { title: 'Find the balance', body: 'Combine the right weights to reach each bottle’s target.' },
    { title: 'Don’t overload it', body: 'A wrong decision can crack — or break — the bottle.' },
  ];
  return (
    <section className="section how-section" id="how-to-play">
      <SectionHeading
        centered
        eyebrow="THE BEAUTY IS IN THE BALANCE"
        title={
          <>
            Simple to Learn. <em>Tricky to Master.</em>
          </>
        }
      >
        A few weights. A glass bottle. One satisfying solution.
      </SectionHeading>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <article className="step" key={step.title}>
            <span className="step-number">0{index + 1}</span>
            <StepArt step={index + 1} />
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className="example-note">
        <Icon name="hint" size={18} />
        <p>
          A little example: <strong>4 kg + 10 kg = a perfectly balanced 14 kg bottle.</strong>
        </p>
      </div>
    </section>
  );
}
export function GameplaySection() {
  return (
    <section className="section split-section gameplay-section" id="gameplay">
      <div className="screen-stage">
        <span className="stage-ring ring-one" />
        <span className="stage-ring ring-two" />
        <GameScreenshot id="gameplay" />
        <span className="stage-note">Every move has its moment.</span>
        <span className="stage-spark" aria-hidden="true">
          ✧
        </span>
      </div>
      <div className="split-copy">
        <SectionHeading
          eyebrow="TAKE A MOMENT. MAKE YOUR MOVE."
          title={
            <>
              Think Before
              <br />
              You <em>Drop.</em>
            </>
          }
        >
          Every move matters. Study the bottle capacities, choose your weights and find the right
          combination.
        </SectionHeading>
        <ul className="check-list">
          <li>
            <Icon name="check" />
            Plan your move
          </li>
          <li>
            <Icon name="check" />
            Balance the bottles
          </li>
          <li>
            <Icon name="check" />
            Complete the level
          </li>
        </ul>
        <div className="helper-tools">
          <span>A little help, when you need it.</span>
          <div>
            <span>
              <Icon name="hint" size={18} />
              Hints
            </span>
            <span>
              <Icon name="undo" size={18} />
              Undo
            </span>
            <span>
              <Icon name="shuffle" size={18} />
              Shuffle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function BottleBreakSection() {
  return (
    <section className="break-section">
      <div className="section split-section">
        <div className="split-copy">
          <SectionHeading
            eyebrow="HANDLE WITH A LITTLE CARE"
            title={
              <>
                Don’t Break
                <br />
                the <em>Bottle!</em>
              </>
            }
          >
            Push a bottle too far and it can crack. Keep the weight under control and recover before
            things fall apart.
          </SectionHeading>
          <div className="bottle-states">
            <span>
              <i />
              Normal
            </span>
            <span>
              <i />
              Cracked
            </span>
            <span>
              <i />
              Broken
            </span>
          </div>
          <p className="break-footnote">
            Keep an eye out for fragile and locked bottles in certain levels. The balance gets a
            little trickier.
          </p>
        </div>
        <div className="dark-screen-stage">
          <span className="dark-orbit" aria-hidden="true" />
          <GameScreenshot id="bottle-broken" />
          <span className="care-note">Easy does it.</span>
        </div>
      </div>
    </section>
  );
}
export function ProgressionSection() {
  return (
    <section className="section progression-section" id="features">
      <div className="progression-top">
        <SectionHeading
          eyebrow="ONE GOOD MOVE DESERVES ANOTHER"
          title={
            <>
              50 Levels
              <br />
              to <em>Master.</em>
            </>
          }
        >
          Work your way through 50 handcrafted and generated, solver-validated campaign puzzles with
          increasing challenges and new mechanics.
        </SectionHeading>
        <div className="progression-screenshot">
          <GameScreenshot id="levels" />
          <span className="stage-note">One good move at a time.</span>
        </div>
      </div>
      <div className="progression-cards">
        <article>
          <Icon name="star" />
          <h3>Earn stars</h3>
          <p>Put your best moves into every puzzle and earn stars for your performance.</p>
        </article>
        <article>
          <Icon name="coins" />
          <h3>Collect your rewards</h3>
          <p>Complete puzzles and collect coins as you progress.</p>
        </article>
        <article>
          <Icon name="undo" />
          <h3>Make another move</h3>
          <p>Replay levels, improve your moves, and find your perfect balance.</p>
        </article>
      </div>
    </section>
  );
}
export function CustomizationSection() {
  return (
    <section className="customization-section">
      <div className="section split-section">
        <div className="shop-stage">
          <GameScreenshot id="shop" />
          <span className="shop-tag">
            <Icon name="spark" size={17} /> A little more you.
          </span>
        </div>
        <div className="split-copy">
          <SectionHeading
            eyebrow="YOUR WORKSHOP. YOUR WAY."
            title={
              <>
                Make It <em>Yours.</em>
              </>
            }
          >
            Unlock and equip different bottles, weights and backgrounds as you progress.
          </SectionHeading>
          <div className="category-tags">
            <span>Bottles</span>
            <span>Weights</span>
            <span>Backgrounds</span>
          </div>
          <p className="styles-label">FIND YOUR FAVORITE BOTTLE</p>
          <div className="bottle-styles">
            {['Classic Glass', 'Royal', 'Legendary', 'Crystal'].map((name, index) => (
              <div key={name}>
                <Icon name="bottle" size={34} className={`bottle-style-${index}`} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function LevelCompleteSection() {
  return (
    <section className="section split-section complete-section">
      <div className="split-copy">
        <div className="three-stars" aria-hidden="true">
          <Icon name="star" size={26} />
          <Icon name="star" size={36} />
          <Icon name="star" size={26} />
        </div>
        <SectionHeading
          eyebrow="THAT PERFECTLY BALANCED FEELING"
          title={
            <>
              Master <em>Every Level.</em>
            </>
          }
        >
          Complete puzzles, earn stars and collect rewards as you progress.
        </SectionHeading>
        <p className="complete-detail">
          Enjoy the finish. Replay for another try, or continue to your next challenge.
        </p>
        <a className="text-link" href="#screenshots">
          Take a look inside <Icon name="arrow" size={18} />
        </a>
      </div>
      <div className="complete-stage">
        <GameScreenshot id="level-complete" />
        <span className="complete-spark" aria-hidden="true">
          ✧
        </span>
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="cta-leaf leaf-left" aria-hidden="true">
        <Icon name="leaf" size={190} />
      </div>
      <div className="cta-inner">
        <Brand large />
        <span className="eyebrow">YOUR NEXT CHALLENGE IS A LITTLE DIFFERENT.</span>
        <h2>
          Can You Find the
          <br />
          <em>Perfect Balance?</em>
        </h2>
        <PlayButton />
        <p>Small Moves. Big Balance.</p>
      </div>
      <div className="cta-leaf leaf-right" aria-hidden="true">
        <Icon name="leaf" size={240} />
      </div>
      <span className="cta-star" aria-hidden="true">
        ✦
      </span>
    </section>
  );
}
