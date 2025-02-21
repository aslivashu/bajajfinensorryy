import { useState } from "react";
import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JsonProcessor() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const validateJson = (input) => {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  };

  const handleSubmit = async () => {
    setError("");
    const parsedJson = validateJson(jsonInput);
    if (!parsedJson) {
      setError("Invalid JSON format");
      return;
    }

    try {
      const res = await fetch("https://your-backend-api.com/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedJson),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Error connecting to backend");
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let result = { ...response };
    if (!selectedFilters.includes("Alphabets")) {
      result.alphabets = undefined;
    }
    if (!selectedFilters.includes("Numbers")) {
      result.numbers = undefined;
    }
    if (!selectedFilters.includes("Highest alphabet")) {
      result.highestAlphabet = undefined;
    }
    return result;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">JSON Processor</h1>
      <Input
        placeholder="Enter JSON"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="my-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit}>Submit</Button>

      {response && (
        <Select multiple onValueChange={setSelectedFilters} className="my-4">
          <SelectItem value="Alphabets">Alphabets</SelectItem>
          <SelectItem value="Numbers">Numbers</SelectItem>
          <SelectItem value="Highest alphabet">Highest Alphabet</SelectItem>
        </Select>
      )}

      {response && (
        <Card className="mt-4">
          <CardContent>
            <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
