from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi_utils.cbv import cbv

router = APIRouter()


@cbv(router)
class RootPage:
    def __init__(self):
        pass

    @router.get("/")
    def get_root_page(self):
        return FileResponse("./static/index.html", status_code=200)
