import { Get, Controller, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { GetCategoriesDto } from "./dto/getCategories.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("test")
  public test() {
    return process.env["teste"];
  }

  @Get()
  public async getCategories(@Query() params: GetCategoriesDto) {
    return await this.categoryService.get(params.limit);
  }

  @Get("update-history")
  public async getUpdateHistory() {
    return await this.categoryService.getUpdateHistory();
  }
}
