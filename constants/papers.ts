// Define the paper type
export interface Paper {
  year: number;
  pdf: number; // require() returns a number (module ID)
}

export const paper1Years: Paper[] = [
  { year: 2025, pdf: require('../pdfs/JUNE2025.pdf') },
  { year: 2024, pdf: require('../pdfs/JUNE2024.pdf') },
  { year: 2023, pdf: require('../pdfs/JUNE2023.pdf') },
  { year: 2022, pdf: require('../pdfs/JUNE2022.pdf') },
  { year: 2021, pdf: require('../pdfs/JUNE2021.pdf') },
  { year: 2020, pdf: require('../pdfs/JUNE2020.pdf') },
  { year: 2019, pdf: require('../pdfs/JUNE2019.pdf') },
  { year: 2018, pdf: require('../pdfs/JUNE2018.pdf') },
  { year: 2017, pdf: require('../pdfs/JUNE2017.pdf') },
  { year: 2016, pdf: require('../pdfs/JUNE2016.pdf') },
  { year: 2015, pdf: require('../pdfs/JUNE2015.pdf') }
];
