import { PartialType } from "@nestjs/mapped-types";
import { CreateMeasureDataDto } from "./create-measure-data.dto";

export class UpdateMeasureDatumDto extends PartialType(CreateMeasureDataDto) {}
