export const parseMetadata = d => ({
  iso_a3: d.ISO_A3,
  iso_num: d.ISO_num,
  developed_or_developing: d.developed_or_developing,
  region: d.region,
  subregion: d.subregion,
  name_formal: d.name_formal,
  name_display: d.name_display,
  lngLat: [+d.lng, +d.lat]
});

export const parseCountryCode = d => {
  return [d["Region, subregion, country or area"], d.Code.padStart(3, "0")];
};

export const parseMigrationData = d => {
  if (+d.Code >= 900) return;

  const migrationFlows = [];
  const dest_name = d["Major area, region, country or area of destination"];
  const year = +d.Year;

  delete d.Year;
  delete d["Sort order"];
  delete d["Major area, region, country or area of destination"];
  delete d.Notes;
  delete d.Code;
  delete d["Type of data (a)"];
  delete d.Total;

  for (let key in d) {
    const origin_name = key;
    const value = d[key];

    if (value !== "..") {
      migrationFlows.push({
        origin_name,
        dest_name,
        year,
        value: +value.replace(/,/g, "")
      });
    }
  }

  return migrationFlows;
};
