const ProcessSteps = () => {
    return (
        <section className="process">
            <div className="process-header">
                <span className="process-badge">How we work</span>
                <h2 className="process-title">It’s Straightforward</h2>
            </div>

            <div className="process-timeline-wrapper">
                {/* Animated line */}
                <svg
                    className="process-line-svg"
                    viewBox="0 0 1200 260"
                    preserveAspectRatio="none"
                >
                    <path
                        className="process-line-path"
                        d="
                            M 80 130
                            C 260 40, 420 40, 600 130
                            C 780 220, 940 220, 1120 130
                        "
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>


                {/* Steps */}
                <div className="process-timeline">
                    <div className="process-step">
                        <div className="process-icon">◆</div>
                        <h3>90-Day Roadmap</h3>
                        <p>
                            We audit your current GBP, analyze your competition,
                            and build a custom plan to reach the top 3.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="process-icon">⬤</div>
                        <h3>We Handle Everything</h3>
                        <p>
                            Daily optimization, reviews, content, and fixes —
                            you don’t lift a finger.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="process-icon">▤</div>
                        <h3>Track Your Climb</h3>
                        <p>
                            Weekly ranking updates show exactly where you stand.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
