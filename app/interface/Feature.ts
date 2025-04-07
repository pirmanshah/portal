export interface Feature {
  id: string;
  title: string;
  url: string;
  icon: string;
  items: FeatureItem[];
}

export interface FeatureItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}
