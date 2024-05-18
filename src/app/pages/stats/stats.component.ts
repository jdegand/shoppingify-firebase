import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe, ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  lists$: Observable<any> | undefined; // document data

  // don't think you can easily type basicData and basicOptions
  basicData: any;
  basicOptions: any;

  toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  ngOnInit(): void {
    this.lists$ = this.shoppingListFirebaseService.getLists().pipe(
      map((data: any) => {

        const flattenedArray: any = [];

        // Loop over the array of objects and push the nested array to the flattened array
        data.forEach((obj: any) => {
          flattenedArray.push(...obj.items);
        });

        const reducedItems = flattenedArray.reduce((acc: any, item: any) => {
          if (acc[item.name]) {
            acc[item.name] += item.quantity;
          } else {
            acc[item.name] = item.quantity;
          }
          return acc;
        }, {});

        // Convert the reduced items object to an array of objects
        const result = Object.keys(reducedItems).map(name => ({ name, quantity: reducedItems[name] }));

        const names = result.map((item: any) => this.toTitleCase(item.name));
        const quantities = result.map((item: any) => item.quantity);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
          labels: names,
          datasets: [
            {
              label: 'Items',
              data: quantities,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };

        this.basicOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };

        return result;
      })
    );

  }


}
