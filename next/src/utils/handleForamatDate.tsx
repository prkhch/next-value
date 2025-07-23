const handleForamatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};

export default handleForamatDate;
