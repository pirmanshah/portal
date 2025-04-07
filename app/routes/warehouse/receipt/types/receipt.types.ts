export type Receipt = {
  code: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  total_count: number;
  custom_doc_type: string | null;
  custom_doc_date: Date | null;
  custom_doc_number: string | null;
  status_summary: string;
  status_color: string;
};
