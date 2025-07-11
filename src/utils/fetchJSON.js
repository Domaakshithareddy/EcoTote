export const fetchJSON=async (filename)=>{
    const response=await fetch(`/data/${filename}`);
    if (!response.ok) throw new Error(`Failed to load ${filename}`);
    return response.json();
};