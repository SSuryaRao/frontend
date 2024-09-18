export const fetchCSVData = async () => {
    const response = await fetch('/api/csv/csvdata');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};
