 

export type WCAGItem = {
  ref_id: string;
  title: string;
  description: string;
  url: string;
  level?: string;
  version?: string;
  references?: { title: string; url: string }[];
  notes?: { content: string }[];
  special_cases?: { title: string; description: string }[];
};

export type JsonToken = {
  $type: JsonTokenType;
  $value: any;
  $description?: string;
};

export type JsonTokenDocument = Record<string, JsonToken>;

export type OperationResult = {
  result: string;
  text: string;
};

export type JsonTokenType =
  | "color"
  | "dimension"
  | "duration"
  | "number"
  | "boolean"
  | "string";
