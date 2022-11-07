import { PartialType } from "@nestjs/mapped-types";
import { CreateMeasureDatumDto } from "./create-measure-datum.dto";

export class UpdateMeasureDatumDto extends PartialType(CreateMeasureDatumDto) {}
