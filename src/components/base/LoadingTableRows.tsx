function LoadingTableRows({ colNo, rowNo }: { colNo: number; rowNo: number }) {
  return (
    <tbody>
      {Array.from(Array(rowNo).keys()).map((_n, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from(Array(colNo).keys()).map((_m, colIndex) => (
            <td key={colIndex}>
              <div className="skeleton h-5 w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default LoadingTableRows;
