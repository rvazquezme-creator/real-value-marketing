const ProcessSteps = () => {
    return (
        <section className="process">
            <div className="process-header">
                <span className="process-badge">How we work</span>
                <h2 className="process-title">It’s Straightforward</h2>
            </div>

            <div className="process-timeline-wrapper">
                {/* Animated electric line */}
                <svg
                    className="process-line-svg"
                    viewBox="0 0 1200 260"
                    preserveAspectRatio="none"
                >
                    <path
                        className="process-line-path"
                        d="
                            M 100 130
                            C 320 60, 480 60, 600 130
                            C 720 200, 880 200, 1100 130
                        "
                        fill="none"
                    />
                </svg>

                <div className="process-timeline">
                    <div className="process-step">
                        <div className="process-icon-card">
                            <div className="process-icon">◆</div>
                        </div>
                        <h3>90-Day Roadmap</h3>
                        <p>
                            We audit your current GBP, analyze your competition,
                            and build a custom plan to reach the top 3.
                        </p>
                    </div>

                    <div className="process-step process-step--offset">
                        <div className="process-icon-card">
                            <div className="process-icon">⬤</div>
                        </div>
                        <h3>We Handle Everything</h3>
                        <p>
                            Daily optimization, reviews, content, and fixes —
                            you don’t lift a finger.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="process-icon-card">
                            <div className="process-icon">▤</div>
                        </div>
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
