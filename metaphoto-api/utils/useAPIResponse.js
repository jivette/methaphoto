const useAPIResponse = () => {
  const sendIterableItems = (items, res) => {
    const data = items;
    return res.status(200).send({
      data
    });
  };

  const sendSingleItem = (data = null, res) => {
    if (!data) return res.status(404).json({ message: 'Data not found' });
    return res.status(200).send({
      data,
    });
  };
  return {
    sendIterableItems,
    sendSingleItem,
  };
};

module.exports = {
  useAPIResponse,
};
