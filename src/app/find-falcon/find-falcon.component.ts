import { CommonServiceService } from './../shared/services/common-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-falcon',
  templateUrl: './find-falcon.component.html',
  styleUrls: ['./find-falcon.component.scss'],
})
export class FindFalconComponent implements OnInit {
  // declaration of all variables
  isSubmit: boolean = false;
  planentsData: any = [];
  vehicleData: any = [];
  isSelected;
  findFalconForm: FormGroup;
  radioSelected1;
  radioSelected2;
  radioSelected3;
  radioSelected4;
  destinationValue = { name: 'select', distance: 500 };
  isDestination1: boolean = false;
  isDestination2: boolean = false;
  isDestination3: boolean = false;
  isDestination4: boolean = false;
  vechile1PrevId;
  vechile2PrevId;
  vechile3PrevId;
  vechile4PrevId;
  totalTime = 0;
  constructor(
    private commonService: CommonServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlanetsDetails();
    this.loadupdatesForm();
    this.getVehicleDetails();
    this.getTokens();
  }

  // loadForm for find a falcon
  loadupdatesForm(): void {
    this.findFalconForm = this.fb.group({
      destination_1: [{ name: 'select', distance: 500 },Validators.required],
      destination_2: [{ name: 'select', distance: 500 },Validators.required],
      destination_3: [{ name: 'select', distance: 500 },Validators.required],
      destination_4: [{ name: 'select', distance: 500 },Validators.required],
      vehicle_name1: ['',Validators.required],
      vehicle_name2: ['',Validators.required],
      vehicle_name3: ['',Validators.required],
      vehicle_name4: ['',Validators.required],
    });
  }

  // list api for planets
  getPlanetsDetails(): void {
    this.commonService.getPlanetLists().subscribe((res: any) => {
      this.planentsData = res;
    }, (err) => {
      alert("Somethimg went wrong.");
    });
  }

  // list api for planets
  getVehicleDetails(): void {
    this.commonService.getVehiclesList().subscribe((res: any) => {
      this.vehicleData = res;
    }, (err) => {
      alert("Somethimg went wrong.");
    });
  }

  // get token api
  getTokens(): void {
    const postData = {
      token: '',
    };
    this.commonService.getToken(postData).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
    }, (err) => {
      alert("Somethimg went wrong.");
    });
  }

  // submitting the form for find falcon
  findFalcon(): void {
    this.isSubmit = true;
    if (this.findFalconForm.valid) {
      const planet_names = [];
      planet_names.push(
        this.findFalconForm.value.destination_1.name,
        this.findFalconForm.value.destination_2.name,
        this.findFalconForm.value.destination_3.name,
        this.findFalconForm.value.destination_4.name
      );
      const vehicle_names = [];
      vehicle_names.push(
        this.findFalconForm.value.vehicle_name1.name,
        this.findFalconForm.value.vehicle_name2.name,
        this.findFalconForm.value.vehicle_name3.name,
        this.findFalconForm.value.vehicle_name4.name
      );
      const postData = {
        token: localStorage.getItem('token'),
        planet_names,
        vehicle_names,
      };
      this.commonService.findFalcon(postData).subscribe((res: any) => {
        if (res.status == 'success') {
          localStorage.setItem('planent', res.planet_name);
          localStorage.setItem('time', this.totalTime.toString());
          this.router.navigateByUrl(`success`);
        } else {
          this.router.navigateByUrl(`fail`);
        }
      },
      (err) => {
        alert("Somethimg went wrong.");
      });
    } else {
      alert('Please Select all fields');
    }
  }


  // update vechicle count

  updateVechileCount(vechile, event): void {
    // vechile1
    // check wheather the previous vechicle name is undefined or not
    if (event.target.name === 'vehicle_name1') {
      if (this.vechile1PrevId !== undefined) {
        // check the selected vechile is not the previous one
        if (this.vechile1PrevId !== vechile.name) {
          // get index of current selection and previous selection
          const index = this.vehicleData.findIndex(
            (item) => item.name === vechile.name
          );
          const index2 = this.vehicleData.findIndex(
            (item) => item.name === this.vechile1PrevId
          );
          // get object of previous selection using its index
          const prevData = this.vehicleData[index2];
          // updated total number of vechile
          prevData.total_no = prevData.total_no + 1;
          this.vehicleData[index2] = prevData;
          vechile.total_no = vechile.total_no - 1;
          this.vehicleData[index] = vechile;
          // calculating the total time taken to find the falcon
          this.totalTime =
            this.totalTime -
            this.findFalconForm.value.destination_1.distance / prevData.speed;
          this.totalTime =
            this.totalTime +
            this.findFalconForm.value.destination_1.distance / vechile.speed;
        }
      } else {
        // find the index of selected vechile
        const index = this.vehicleData.findIndex(
          (item) => item.name === vechile.name
        );
        // update the total number of vechile
        vechile.total_no = vechile.total_no - 1;
        // object of the array is replaced with updated vechile count
        this.vehicleData[index] = vechile;
        // updated time taken
        this.totalTime =
          this.totalTime +
          this.findFalconForm.value.destination_1.distance / vechile.speed;
      }
      this.vechile1PrevId = vechile.name;
    }

    // vechile2
    if (event.target.name === 'vehicle_name2') {
      if (this.vechile2PrevId !== undefined) {
        if (this.vechile2PrevId !== vechile.name) {
          const index = this.vehicleData.findIndex(
            (item) => item.name === vechile.name
          );
          const index2 = this.vehicleData.findIndex(
            (item) => item.name === this.vechile2PrevId
          );
          const prevData = this.vehicleData[index2];
          prevData.total_no = prevData.total_no + 1;
          this.vehicleData[index2] = prevData;
          vechile.total_no = vechile.total_no - 1;
          this.vehicleData[index] = vechile;
          this.totalTime =
            this.totalTime -
            this.findFalconForm.value.destination_2.distance / prevData.speed;
          this.totalTime =
            this.totalTime +
            this.findFalconForm.value.destination_2.distance / vechile.speed;
        }
      } else {
        const index = this.vehicleData.findIndex(
          (item) => item.name === vechile.name
        );
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime =
          this.totalTime +
          this.findFalconForm.value.destination_2.distance / vechile.speed;
      }
      this.vechile2PrevId = vechile.name;
    }

    // vehicle3
    if (event.target.name === 'vehicle_name3') {
      if (this.vechile3PrevId !== undefined) {
        if (this.vechile3PrevId !== vechile.name) {
          const index = this.vehicleData.findIndex(
            (item) => item.name === vechile.name
          );
          const index2 = this.vehicleData.findIndex(
            (item) => item.name === this.vechile3PrevId
          );
          const prevData = this.vehicleData[index2];
          prevData.total_no = prevData.total_no + 1;
          this.vehicleData[index2] = prevData;
          vechile.total_no = vechile.total_no - 1;
          this.vehicleData[index] = vechile;
          this.totalTime =
            this.totalTime -
            this.findFalconForm.value.destination_3.distance / prevData.speed;
          this.totalTime =
            this.totalTime +
            this.findFalconForm.value.destination_3.distance / vechile.speed;
        }
      } else {
        const index = this.vehicleData.findIndex(
          (item) => item.name === vechile.name
        );
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime =
          this.totalTime +
          this.findFalconForm.value.destination_3.distance / vechile.speed;
      }
      this.vechile3PrevId = vechile.name;
    }

    // vehicle4
    if (event.target.name === 'vehicle_name4') {
      if (this.vechile4PrevId !== undefined) {
        if (this.vechile4PrevId !== vechile.name) {
          const index = this.vehicleData.findIndex(
            (item) => item.name === vechile.name
          );
          const index2 = this.vehicleData.findIndex(
            (item) => item.name === this.vechile4PrevId
          );
          const prevData = this.vehicleData[index2];
          prevData.total_no = prevData.total_no + 1;
          this.vehicleData[index2] = prevData;
          vechile.total_no = vechile.total_no - 1;
          this.vehicleData[index] = vechile;
          this.totalTime =
            this.totalTime -
            this.findFalconForm.value.destination_4.distance / prevData.speed;
          this.totalTime =
            this.totalTime +
            this.findFalconForm.value.destination_4.distance / vechile.speed;
        }
      } else {
        const index = this.vehicleData.findIndex(
          (item) => item.name === vechile.name
        );
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime =
          this.totalTime +
          this.findFalconForm.value.destination_4.distance / vechile.speed;
      }
      this.vechile4PrevId = vechile.name;
    }
  }
}
