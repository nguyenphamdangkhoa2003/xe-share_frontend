export const getInitials = (name?: string | null) => {
    if (!name) return 'US';
    const names = name.split(' ');
    return names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
};
