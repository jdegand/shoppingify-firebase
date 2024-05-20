import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Item } from '../../interfaces/item.interface';
import { List } from '../../interfaces/list.interface';
import { StatsResult } from '../../interfaces/stats-result.interface';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe, ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  lists$: Observable<{ name: string; quantity: number; }[]> | undefined;

  // don't think you can easily type basicData and basicOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  basicData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  basicOptions: any;

  toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  ngOnInit(): void {
    this.lists$ = this.shoppingListFirebaseService.getLists().pipe(
      map((data: List[]) => {

        const flattenedArray: Item[] = [];

        // Loop over the array of objects and push the nested array to the flattened array
        data.forEach((obj: List) => {
          flattenedArray.push(...obj.items);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const reducedItems = flattenedArray.reduce((acc: any, item: Item) => {
          if (acc[item.name]) {
            acc[item.name] += item.quantity;
          } else {
            acc[item.name] = item.quantity;
          }
          return acc;
        }, {});

        // Convert the reduced items object to an array of objects
        const result = Object.keys(reducedItems).map(name => ({ name, quantity: reducedItems[name] }));

        const names = result.map((item: StatsResult) => this.toTitleCase(item.name));
        const quantities = result.map((item: StatsResult) => item.quantity);

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
