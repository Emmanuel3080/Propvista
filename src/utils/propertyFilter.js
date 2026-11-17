export const CATEGORY_PILLS = [
  { id: "all", label: "All Properties" },
  { id: "architectural", label: "Architectural" },
  { id: "waterfront", label: "Waterfront" },
  { id: "penthouse", label: "Penthouse" },
  { id: "garden-villa", label: "Garden Villa" },
  { id: "new-build", label: "New Build" },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All Property Types" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "bungalow", label: "Bungalow" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

export const PRICE_RANGE_OPTIONS = [
  { value: "all", label: "Any Price" },
  { value: "under-5m", label: "Under ₦5,000,000" },
  { value: "5m-25m", label: "₦5,000,000 – ₦25,000,000" },
  { value: "25m-100m", label: "₦25,000,000 – ₦100,000,000" },
  { value: "above-100m", label: "Above ₦100,000,000" },
];

export function matchesCategory(prop, categoryId) {
  if (!categoryId || categoryId === "all") return true;
  const hay = `${prop?.title || ""} ${prop?.description || ""} ${prop?.propertyType || ""} ${prop?.location || ""}`.toLowerCase();
  const type = (prop?.propertyType || "").toLowerCase();

  switch (categoryId) {
    case "architectural":
      return (
        hay.includes("architect") ||
        hay.includes("modern") ||
        hay.includes("contemporary") ||
        hay.includes("design") ||
        type === "duplex" ||
        type === "commercial"
      );
    case "waterfront":
      return (
        hay.includes("water") ||
        hay.includes("island") ||
        hay.includes("beach") ||
        hay.includes("lagoon") ||
        hay.includes("ocean") ||
        hay.includes("lekki") ||
        hay.includes("victoria") ||
        hay.includes("ikoyi")
      );
    case "penthouse":
      return (
        hay.includes("penthouse") ||
        hay.includes("luxury") ||
        hay.includes("sky") ||
        hay.includes("terrace") ||
        type === "apartment"
      );
    case "garden-villa":
      return (
        hay.includes("villa") ||
        hay.includes("garden") ||
        hay.includes("estate") ||
        hay.includes("courtyard") ||
        type === "bungalow" ||
        type === "duplex"
      );
    case "new-build": {
      if (hay.includes("new") || hay.includes("newly") || hay.includes("development")) {
        return true;
      }
      if (prop?.createdAt) {
        const ageDays = (Date.now() - new Date(prop.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays <= 90) return true;
      }
      return true;
    }
    default:
      return true;
  }
}

export function filterAndSortProperties(properties = [], filters = {}, savedIds = []) {
  if (!Array.isArray(properties)) return [];

  const {
    locationQuery = "",
    propertyType = "all",
    priceRange = "all",
    minBedrooms = "any",
    category = "all",
    savedOnly = false,
    sortBy = "newest",
  } = filters;

  const query = locationQuery.trim().toLowerCase();

  const filtered = properties.filter((prop) => {
    if (!prop) return false;

    if (savedOnly && !savedIds.includes(prop._id)) {
      return false;
    }

    if (query) {
      const searchable = `${prop.location || ""} ${prop.title || ""} ${prop.description || ""} ${prop.propertyType || ""} ${prop.agent?.agencyName || ""}`.toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }

    if (propertyType && propertyType !== "all") {
      if ((prop.propertyType || "").toLowerCase() !== propertyType.toLowerCase()) {
        return false;
      }
    }

    if (priceRange && priceRange !== "all") {
      const price = Number(prop.price) || 0;
      if (priceRange === "under-5m" && price >= 5000000) return false;
      if (priceRange === "5m-25m" && (price < 5000000 || price > 25000000)) return false;
      if (priceRange === "25m-100m" && (price < 25000000 || price > 100000000)) return false;
      if (priceRange === "above-100m" && price <= 100000000) return false;
    }

    if (minBedrooms && minBedrooms !== "any") {
      const beds = Number(prop.bedrooms) || 0;
      if (beds < Number(minBedrooms)) return false;
    }

    if (category && category !== "all") {
      if (!matchesCategory(prop, category)) return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") {
      return (Number(a.price) || 0) - (Number(b.price) || 0);
    }
    if (sortBy === "price-desc") {
      return (Number(b.price) || 0) - (Number(a.price) || 0);
    }
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}
