const SubEventBtn: React.FC<{
    text: string;
    onClick?: () => void;
}> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-violet-300 bg-grey-tertiary py-1 px-4 rounded-lg text-sm whitespace-nowrap"
        >
            {text}
        </button>
    );
};
export default SubEventBtn;
