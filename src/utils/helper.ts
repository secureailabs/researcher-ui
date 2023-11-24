const formatReceivedTime = (receivedTime: string) => {
  const currentDate = new Date();
  const receivedDate = new Date(receivedTime);

  const currentYear = currentDate.getFullYear();
  const receivedYear = receivedDate.getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (currentYear === receivedYear) {
    // If the year is the current year, format as '10 Oct'
    const day = receivedDate.getDate();
    const month = monthNames[receivedDate.getMonth()];
    return `${day} ${month}`;
  } else {
    // If it's a different year, format as '10 Oct 2022'
    const day = receivedDate.getDate();
    const month = monthNames[receivedDate.getMonth()];
    const year = receivedYear;
    return `${day} ${month} ${year}`;
  }
};
const getEmailLabel = (tag: string) => {
  const LABEL_CONFIG = [
    {
      color: '#f58c8c',
      label: 'General Breasties'
    },
    {
      color: '#9fdef5',
      label: 'General Info'
    },
    {
      color: '#f5d98c',
      label: 'In a trial'
    },
    {
      color: '#f5d98c',
      label: 'Interested in a trial'
    },
    {
      color: '#f5d98c',
      label: 'Newly Diagnosed'
    },
    {
      color: '#f5d98c',
      label: 'Partners'
    }
  ];

  const label = LABEL_CONFIG.find((label) => label.label === tag);
  return label;
};

export { formatReceivedTime, getEmailLabel };
