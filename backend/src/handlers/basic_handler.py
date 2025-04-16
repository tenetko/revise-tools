import io

import pandas as pd
from fastapi import Response


class BasicHandler:

    def handle(self):
        raise NotImplementedError

    @staticmethod
    def _get_dataframe(report: io.BytesIO, sheet_number: int, skip_rows: int, converters: dict) -> pd.DataFrame:
        excel_file = pd.ExcelFile(report)
        df = pd.read_excel(excel_file, sheet_name=sheet_number, skiprows=skip_rows, converters=converters)

        return df

    @staticmethod
    def _convert_order_numbers_to_list(order_numbers: str) -> list:
        return order_numbers.split(",")

    @staticmethod
    def _put_changes_to_output_file(changes: list[dict]) -> io.StringIO:
        buffer = io.StringIO()
        df = pd.DataFrame(changes)
        df.to_csv(buffer, index=False)
        buffer.seek(0)

        return buffer

    @staticmethod
    def _return_csv_file(file, filename):
        response = Response(
            content=file.read(),
            media_type="text/csv",
            headers={
                "Access-Control-Expose-Headers": "Content-Disposition",
                "Content-Disposition": f"attachment; filename={filename}",
            },
        )
        file.close()

        return response
