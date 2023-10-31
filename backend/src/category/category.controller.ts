import { Get, Controller, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { GetCategoriesDto } from "./dto/getCategories.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("teste")
  public async sleep() {
    return await new Promise((resolve) =>
      setTimeout(() => resolve("Ola mundo"), 8000),
    );
  }

  @Get()
  public async get(@Query() params: GetCategoriesDto) {
    console.log("[GET]: categories");
    return await this.categoryService.get(params.limit);
  }
}
