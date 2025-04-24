const showFormattedDate = (date, locale = 'id') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (locale === 'ja') {
    return new Date(date).toLocaleDateString('ja-JP', {
      ...options,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
};

export { showFormattedDate };
