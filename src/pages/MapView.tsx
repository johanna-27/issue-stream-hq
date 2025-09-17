import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockCivicIssues } from "@/data/mockData";
import { MapPin, Filter, Layers } from "lucide-react";

// ✅ Import Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const customIcon = new L.Icon({
  iconUrl: "/img.png",          // must be in /public
  iconRetinaUrl: "/custom-marker.png",    // same if no 2x version
  //shadowUrl: "/custom-marker-shadow.png", // optional
  iconSize: [32, 32],     // size of the icon
  iconAnchor: [16, 32],   // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32],  // point from which the popup should open relative to the iconAnchor
});



export default function MapView() {
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [showHeatmap, setShowHeatmap] = useState(false);

  const filteredIssues = selectedWard === "all"
    ? mockCivicIssues
    : mockCivicIssues.filter(issue => issue.ward === selectedWard);

  const wards = Array.from(new Set(mockCivicIssues.map(issue => issue.ward))).sort();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interactive Issue Map</h1>
          <p className="text-muted-foreground">Real-time view of all civic issues across the city</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedWard} onValueChange={setSelectedWard}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              {wards.map(ward => (
                <SelectItem key={ward} value={ward}>{ward}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant={showHeatmap ? "default" : "outline"}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Layers className="w-4 h-4 mr-2" />
            Heatmap
          </Button>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Issues</p>
                <p className="text-2xl font-bold">{filteredIssues.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-primary-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Critical Issues</p>
                <p className="text-2xl font-bold text-urgent">
                  {filteredIssues.filter(i => i.urgency === 'critical').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-urgent/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-urgent rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">In Progress</p>
                <p className="text-2xl font-bold text-warning">
                  {filteredIssues.filter(i => i.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Resolved Today</p>
                <p className="text-2xl font-bold text-success">
                  {filteredIssues.filter(i => i.status === 'resolved').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Container */}
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              City Map View
              {showHeatmap && (
                <span className="text-sm text-muted-foreground">(Heatmap Active)</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                  center={([19.0760, 72.8777] as [number, number])}// ✅ Mumbai
  zoom={12}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>


                {filteredIssues.map(issue => (
                  <Marker key={issue.id} position={issue.coordinates}>
                    <Popup>
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">{issue.location}</p>
                        <div className="flex gap-2 mt-2">
                          <StatusBadge urgency={issue.urgency as any}>{issue.urgency}</StatusBadge>
                          <StatusBadge status={issue.status as any}>{issue.status}</StatusBadge>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Issue List Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Issues</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredIssues.slice(0, 10).map((issue) => (
                <div key={issue.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm leading-tight">{issue.title}</h4>
                    <StatusBadge urgency={issue.urgency as any} className="text-xs px-2 py-0">
                      {issue.urgency}
                    </StatusBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{issue.location}</p>
                  <div className="flex items-center justify-between">
                    <StatusBadge status={issue.status as any} className="text-xs px-2 py-0">
                      {issue.status}
                    </StatusBadge>
                    <span className="text-xs text-muted-foreground">{issue.ward}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
