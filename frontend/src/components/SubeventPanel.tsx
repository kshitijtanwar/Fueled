interface AsideProps {
    subevents: string[];
}

const Subevents: React.FC<AsideProps> = ({ subevents }) => {
    return (
        <aside className="h-screen bg-[#2C2F34] p-3">
            <h2 className="text-indigo-300">Further events</h2>
            <ul>
                {subevents.map((subevent, index) => (
                    <li key={index}>{subevent}</li>
                ))}
            </ul>
        </aside>
    );
};

export default Subevents;
