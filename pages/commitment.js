export default function Commitment() {
    const items = [
        {
            label: "Open Source",
            description: "I contribute to open source projects and believe in sharing knowledge freely with the community.",
        },
        {
            label: "Accessibility",
            description: "Every interface I build aims to be usable by everyone, regardless of ability or device.",
        },
        {
            label: "Performance",
            description: "Fast, lean code. No unnecessary bloat. I care deeply about the experience on every connection.",
        },
        {
            label: "Privacy",
            description: "I don't collect data I don't need. I respect users' right to their own information.",
        },
        {
            label: "Craft",
            description: "I take pride in the quality of my work — both what's visible and what's underneath.",
        },
        {
            label: "Community",
            description: "From organizing meetups to mentoring, I invest time in the people around me.",
        },
    ]

    return (
        <main>
            <div className="description" style={{ marginBottom: "2.5rem" }}>
                things i believe in
            </div>

            <div className="commitment-grid">
                {items.map((item) => (
                    <div className="commitment-card" key={item.label}>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
