import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('vaccine')
export class Vaccine {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  @Index()
  YearWeekISO: string;
  @Column()
  FirstDose: string;
  @Column()
  FirstDoseRefused: number;
  @Column()
  SecondDose: number;
  @Column()
  DoseAdditional1: number;
  @Column()
  DoseAdditional2: number;
  @Column()
  UnknownDose: number;
  @Column()
  NumberDosesReceived: number;
  @Column()
  NumberDosesExported: number;
  @Column()
  @Index()
  Region: string;
  @Column()
  Population: string;
  @Column()
  ReportingCountry: string;
  @Column()
  TargetGroup: string;
  @Column()
  Vaccine: string;
  @Column()
  Denominator: number;
}
