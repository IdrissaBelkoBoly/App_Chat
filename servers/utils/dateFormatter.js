const formatDate = (date) => {
  if (!date) return null;

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} jour(s) auparavant`;
  if (hours > 0) return `${hours} heure(s) auparavant`;
  if (minutes > 0) return `${minutes} minute(s) auparavant`;
  return `${seconds} seconde(s) auparavant`;
};

module.exports = { formatDate, timeAgo };
