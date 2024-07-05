import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent]
})
export class AppComponent {
  resultsData?:{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number,
  }[];

  onCalculateInvestmentResults(investmentInputs: InvestmentInput) {
    const annualData = [];
    let investmentValue = investmentInputs.initialInvestment;
  
    for (let i = 0; i < investmentInputs.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (investmentInputs.expectedReturn / 100);
      investmentValue += interestEarnedInYear + investmentInputs.annualInvestment;
      const totalInterest =
        investmentValue - investmentInputs.annualInvestment * year - investmentInputs.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: investmentInputs.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: investmentInputs.initialInvestment + investmentInputs.annualInvestment * year,
      });
    }
  
    this.resultsData = annualData;
  }
}
