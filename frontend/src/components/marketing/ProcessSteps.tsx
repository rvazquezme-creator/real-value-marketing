const ProcessSteps = () => {
    return (
        <section className="process">
            <div className="process-header">
                <span className="process-badge">How we work</span>
                <h2 className="process-title">It’s Straightforward</h2>
            </div>

            <div className="process-timeline">
                <div className="process-step">
                    <div className="process-icon">◆</div>
                    <h3>90-Day Roadmap</h3>
                    <p>
                        We audit your current GBP, analyze your competition,
                        and build a custom plan to get you into the top 3.
                    </p>
                </div>

                <div className="process-line" />

                <div className="process-step">
                    <div className="process-icon">⬤</div>
                    <h3>We Handle Everything</h3>
                    <p>
                        Daily optimization, review management, content posting,
                        and technical fixes — you don’t lift a finger.
                    </p>
                </div>

                <div className="process-line" />

                <div className="process-step">
                    <div className="process-icon">▤</div>
                    <h3>Track Your Climb</h3>
                    <p>
                        Weekly ranking updates show exactly where you stand
                        and how close you are to the top 3.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
