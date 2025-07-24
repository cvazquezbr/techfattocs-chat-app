const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Pergunta {current} de {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

