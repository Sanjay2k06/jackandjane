import { useEffect, useRef, useState } from "react";

interface Centre {
  id: "palavakkam" | "neelankarai";
  name: string;
  centreName: string;
  area: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  topPct: string;
  leftPct: string;
  gmapsUrl: string;
}

const CENTRES: Centre[] = [
  {
    id: "palavakkam",
    name: "Jack & Jane Developmental Centre",
    centreName: "Palavakkam Centre",
    area: "Palavakkam, ECR",
    address: "East Coast Road (ECR), Palavakkam, Chennai, Tamil Nadu 600041",
    landmark: "Near Palavakkam Beach Road, East Coast Road corridor",
    phone: "73972 71374",
    hours: "2:00 PM – 8:00 PM",
    lat: 12.9634,
    lng: 80.2529,
    topPct: "34%",
    leftPct: "48%",
    gmapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jack+and+Jane+Developmental+Centre+Palavakkam+Chennai",
  },
  {
    id: "neelankarai",
    name: "Jack & Jane Developmental Centre",
    centreName: "Neelankarai Centre",
    area: "Neelankarai, ECR",
    address: "East Coast Road (ECR), Neelankarai, Chennai, Tamil Nadu 600115",
    landmark: "East Coast Road near Neelankarai Beach Road",
    phone: "73972 71374",
    hours: "2:00 PM – 8:00 PM",
    lat: 12.9482,
    lng: 80.2505,
    topPct: "66%",
    leftPct: "45%",
    gmapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jack+and+Jane+Developmental+Centre+Neelankarai+Chennai",
  },
];

export function CentresMap() {
  const [selectedId, setSelectedId] = useState<"palavakkam" | "neelankarai">("palavakkam");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [isLeafletReady, setIsLeafletReady] = useState(false);

  const activeCentre = CENTRES.find((c) => c.id === selectedId) || CENTRES[0];

  // Helper to load Leaflet client-side without SSR crash
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      try {
        let L = (window as any).L;
        if (!L) {
          // Dynamic import of Leaflet
          const leafletMod = await import("leaflet");
          L = leafletMod.default || leafletMod;
        }

        if (!isMounted || !mapContainerRef.current) return;

        // Clean up any stale map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Center slightly inland to keep land dominant and reduce ocean expanse
        const map = L.map(mapContainerRef.current, {
          center: [12.956, 80.247],
          zoom: 14,
          scrollWheelZoom: false,
          zoomControl: false,
          attributionControl: false,
        });

        // Add subtle zoom control at bottom right
        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Minimal light tiles with muted roads & subtle land colors
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          className: "minimal-light-tiles",
        }).addTo(map);

        // Create refined Navy/Orange custom markers
        const createRefinedIcon = (centre: Centre, isCurrent: boolean) => {
          return L.divIcon({
            className: "refined-brand-marker",
            html: `
              <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
                <!-- Label Pill -->
                <div style="
                  background: ${isCurrent ? "#F27952" : "#1c1d2e"};
                  color: #ffffff;
                  font-family: system-ui, -apple-system, sans-serif;
                  font-size: 11px;
                  font-weight: 700;
                  padding: 4px 10px;
                  border-radius: 9999px;
                  border: 2px solid #ffffff;
                  box-shadow: 0 4px 12px rgba(28,29,46,0.25);
                  white-space: nowrap;
                  margin-bottom: 4px;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  transition: all 0.25s ease;
                ">
                  <span>${isCurrent ? "★" : "📍"}</span>
                  <span>${centre.centreName}</span>
                </div>
                <!-- Navy & Orange Teardrop Pin -->
                <div style="
                  width: 32px;
                  height: 32px;
                  background: #1c1d2e;
                  border: 2.5px solid #ffffff;
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: ${
                    isCurrent
                      ? "0 0 0 4px rgba(242,121,82,0.4), 0 6px 14px rgba(28,29,46,0.35)"
                      : "0 4px 12px rgba(28,29,46,0.25)"
                  };
                  transition: all 0.25s ease;
                ">
                  <!-- Orange Center Core -->
                  <div style="width: 12px; height: 12px; background: #F27952; border-radius: 50%; transform: rotate(45deg);"></div>
                </div>
              </div>
            `,
            iconSize: [120, 60],
            iconAnchor: [60, 56],
          });
        };

        CENTRES.forEach((centre) => {
          const isSelected = centre.id === selectedId;
          const marker = L.marker([centre.lat, centre.lng], {
            icon: createRefinedIcon(centre, isSelected),
            title: centre.centreName,
          }).addTo(map);

          marker.on("click", () => {
            setSelectedId(centre.id);
          });

          markersRef.current[centre.id] = marker;
        });

        mapInstanceRef.current = map;
        setIsLeafletReady(true);
      } catch (err) {
        console.warn("Leaflet light map initializing with visual overlay:", err);
      }
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map focus and marker styling when selectedId changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    const target = CENTRES.find((c) => c.id === selectedId);
    if (!target) return;

    // Smoothly focus/zoom onto the selected centre
    mapInstanceRef.current.flyTo([target.lat, target.lng - 0.0025], 15.2, {
      duration: 0.8,
    });

    // Refresh marker icons to reflect active state
    CENTRES.forEach((centre) => {
      const marker = markersRef.current[centre.id];
      if (marker) {
        const isCurrent = centre.id === selectedId;
        const newIcon = L.divIcon({
          className: "refined-brand-marker",
          html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
              <div style="
                background: ${isCurrent ? "#F27952" : "#1c1d2e"};
                color: #ffffff;
                font-family: system-ui, -apple-system, sans-serif;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 9999px;
                border: 2px solid #ffffff;
                box-shadow: 0 4px 12px rgba(28,29,46,0.25);
                white-space: nowrap;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                gap: 4px;
                transition: all 0.25s ease;
              ">
                <span>${isCurrent ? "★" : "📍"}</span>
                <span>${centre.centreName}</span>
              </div>
              <div style="
                width: 32px;
                height: 32px;
                background: #1c1d2e;
                border: 2.5px solid #ffffff;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: ${
                  isCurrent
                    ? "0 0 0 4px rgba(242,121,82,0.4), 0 6px 14px rgba(28,29,46,0.35)"
                    : "0 4px 12px rgba(28,29,46,0.25)"
                };
                transition: all 0.25s ease;
              ">
                <div style="width: 12px; height: 12px; background: #F27952; border-radius: 50%; transform: rotate(45deg);"></div>
              </div>
            </div>
          `,
          iconSize: [120, 60],
          iconAnchor: [60, 56],
        });
        marker.setIcon(newIcon);
      }
    });
  }, [selectedId]);

  return (
    <div className="w-full">
      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[400px_1fr]">
        {/* Left Side: Curated Location Selector Cards */}
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Select Centre
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                2 Locations on ECR
              </span>
            </div>

            {CENTRES.map((centre) => {
              const isSelected = centre.id === selectedId;
              return (
                <div
                  key={centre.id}
                  onClick={() => setSelectedId(centre.id)}
                  className={`group relative cursor-pointer rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 ${
                    isSelected
                      ? "border-foreground bg-card shadow-[4px_4px_0_var(--color-foreground)] ring-2 ring-primary"
                      : "border-border bg-card/70 hover:border-foreground/60 hover:bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {centre.area}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-bold text-primary">
                            ● Focused on map
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1.5 font-display text-xl font-bold text-foreground">
                        {centre.centreName}
                      </h4>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-105 ${
                        isSelected
                          ? "border-foreground bg-primary text-primary-foreground shadow-xs"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      📍
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {centre.address}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="flex items-center gap-1">
                      🕒 <span>{centre.hours}</span>
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-bold text-emerald-600">Admissions Open</span>
                  </div>

                  {/* Quick Contact Action Buttons */}
                  <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border">
                    <a
                      href={`tel:+91${centre.phone.replace(/\s+/g, "")}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 rounded-xl bg-secondary px-3 py-2 text-center text-xs font-bold text-secondary-foreground shadow-xs transition-opacity hover:opacity-90"
                    >
                      📞 {centre.phone}
                    </a>
                    <a
                      href="https://wa.me/917397271374"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-90"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom editorial badge */}
          <div className="rounded-2xl border border-dashed border-border p-3.5 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">
              🌟 Both centres fully equipped for developmental therapies
            </p>
            <p className="mt-0.5 text-[11px]">
              Comprehensive Speech, Sensory Integration, Early Intervention & Play Therapy.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Minimal Light Map */}
        <div className="relative h-[340px] sm:h-[420px] md:h-[480px] lg:h-full lg:min-h-[480px] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border-2 border-foreground bg-[#f5f2eb] shadow-[5px_5px_0_var(--color-foreground)] sm:shadow-[6px_6px_0_var(--color-foreground)]">
          {/* Leaflet container with minimal light map tiles */}
          <div ref={mapContainerRef} className="minimal-light-map z-0 h-full w-full" />

          {/* Smooth light-mode fallback iframe if tiles take time */}
          {!isLeafletReady && (
            <div className="absolute inset-0 z-0">
              <iframe
                title="Jack & Jane Centres Map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=80.2380%2C12.9370%2C80.2640%2C12.9730&layer=mapnik&marker=${activeCentre.lat}%2C${activeCentre.lng}`}
                className="minimal-light-map h-full w-full border-0"
                loading="lazy"
              />
            </div>
          )}

          {/* Top Floating Context Header */}
          <div className="pointer-events-none absolute left-4 right-4 top-4 z-[400] flex items-center justify-between gap-2">
            <div className="pointer-events-auto rounded-full border-2 border-foreground bg-card/95 px-3.5 py-1.5 shadow-[3px_3px_0_var(--color-foreground)] backdrop-blur-xs">
              <span className="text-[11px] font-bold text-foreground">
                📍 Showing:{" "}
                <span className="text-primary font-extrabold">{activeCentre.centreName}</span>
              </span>
            </div>

            <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur-xs">
              <span>ECR Corridor</span>
            </div>
          </div>

          {/* Compact Location Card anchored on the map */}
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[400] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
            <div className="pointer-events-auto rounded-xl sm:rounded-2xl border-2 border-foreground bg-card p-3 sm:p-4 shadow-[5px_5px_0_var(--color-foreground)] sm:shadow-[6px_6px_0_var(--color-foreground)] backdrop-blur-xs transition-all duration-300">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-primary">
                    Jack & Jane Developmental Centre
                  </span>
                  <h4 className="font-display text-base font-bold text-foreground leading-tight">
                    {activeCentre.centreName}
                  </h4>
                </div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                  {activeCentre.area}
                </span>
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {activeCentre.address}
              </p>

              <div className="mt-2.5 flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-semibold text-foreground">
                <span>🕒 {activeCentre.hours}</span>
                <span className="text-[11px] font-bold text-primary">73972 71374</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`tel:+91${activeCentre.phone.replace(/\s+/g, "")}`}
                  className="flex-1 rounded-xl bg-primary px-3 py-2 text-center text-xs font-bold text-primary-foreground shadow-xs transition-opacity hover:opacity-90"
                >
                  📞 {activeCentre.phone}
                </a>
                <a
                  href="https://wa.me/917397271374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-90"
                >
                  WhatsApp
                </a>
                <a
                  href={activeCentre.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-card px-2.5 py-2 text-xs font-bold text-foreground hover:bg-muted"
                  title="Open directions in Google Maps"
                >
                  Directions ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
