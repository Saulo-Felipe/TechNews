import { Get, Controller, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { GetCategoriesDto } from "./dto/getCategories.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("teste")
  public async sleep() {
    return "ola mundo";
  }

  @Get()
  public async get(@Query() params: GetCategoriesDto) {
    console.log("[GET]: categories");
    return await this.categoryService.get(params.limit);
  }
}
