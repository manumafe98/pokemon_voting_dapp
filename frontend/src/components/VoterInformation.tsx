interface VoterInformationProps {
  hasVoted: boolean | undefined;
  pokemonName: string | undefined;
}

export const VoterInformation = ({
  hasVoted,
  pokemonName,
}: VoterInformationProps) => {
  const topics = [
    {
      category: "My Vote",
      value: pokemonName,
    },
    {
      category: "Available Votes",
      value: hasVoted ? 0 : 1,
    },
  ];

  return (
    <div className="flex justify-between h-48 p-10">
      {topics.map((topic, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-gray-600 text-2xl">{topic.category}</div>
          <div className="text-white text-3xl mt-4">{topic.value}</div>
        </div>
      ))}
    </div>
  );
};
