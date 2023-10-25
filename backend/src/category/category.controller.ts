import { Get, Controller, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { GetCategoriesDto } from "./dto/getCategories.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("teste")
  public async sleep() {
    return await new Promise((resolve) =>
      setTimeout(() => resolve("Ola mundo"), 15000),
    );
  }

  @Get(":amount")
  public async get(@Param() params: GetCategoriesDto) {
    console.log("[GET]: categories");
    return await this.categoryService.get(params.amount);
  }
}
