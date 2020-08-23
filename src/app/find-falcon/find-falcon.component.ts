import { CommonServiceService } from "./../shared/services/common-service.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-find-falcon",
  templateUrl: "./find-falcon.component.html",
  styleUrls: ["./find-falcon.component.scss"],
})
export class FindFalconComponent implements OnInit {
  isSubmit: boolean = false;
  planentsData: any = [];
  vehicleData: any = [];
  isSelected;
  findFalconForm: FormGroup;
  radioSelected1;
  radioSelected2;
  radioSelected3;
  radioSelected4;
  destinationValue = {name: "select", distance: 500};
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
    private router: Router,
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
      destination_1: [{ name: "select", distance: 500 }],
      destination_2: [{ name: "select", distance: 500 }],
      destination_3: [{ name: "select", distance: 500 }],
      destination_4: [{ name: "select", distance: 500 }],
      vehicle_name1: [],
      vehicle_name2: [],
      vehicle_name3: [],
      vehicle_name4: [],
    });
  }

  // list api for planets
  getPlanetsDetails() {
    this.commonService.getPlanetLists().subscribe((res: any) => {
      console.log(res);
      this.planentsData = res;
      console.log("planentsData", this.planentsData);
    });
  }

  // list api for planets
  getVehicleDetails() {
    this.commonService.getVehiclesList().subscribe((res: any) => {
      console.log(res);
      this.vehicleData = res;
      console.log("vehicleData", this.vehicleData);
    });
  }

  // get token api
  getTokens() {
    const postData = {
      token: "",
    };
    this.commonService.getToken(postData).subscribe((res: any) => {
      console.log(res.token);
      localStorage.setItem("token", res.token);
    });
  }
  // submitting the form for find falcon
  findFalcon() {
    this.isSubmit = true;
    console.log(this.findFalconForm.value);

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
        token: localStorage.getItem("token"),
        planet_names,
        vehicle_names,
      };
      this.commonService.findFalcon(postData).subscribe((res: any) => {
        console.log(res);
        if (res.status == "success") {
          localStorage.setItem('planent', res.planet_name);
          localStorage.setItem('time', this.totalTime.toString());
          this.router.navigateByUrl(`success`);
        } else {
          this.router.navigateByUrl(`fail`);
        }
      });
    } else {
      alert("Something went wrong");
    }
  }
  // update vechicle count

  updateVechileCount(vechile, event, ) {
    console.log(vechile, event.target.name);
    // vechile1
    // check wheather the previous vechicle name is undefined or not
    if (event.target.name === 'vehicle_name1') {
      if (this.vechile1PrevId !== undefined) {
        // check the selected vechile is not the previous one
           if (this.vechile1PrevId !== vechile.name) {
             // get index of current selection and previous selection
             const index = this.vehicleData.findIndex(item => item.name === vechile.name);
             const index2 = this.vehicleData.findIndex(item => item.name === this.vechile1PrevId);
             console.log(index, index2);
             // get object of previous selection using its index
             const prevData = this.vehicleData[index2];
             // updated total number of vechile
             prevData.total_no = prevData.total_no + 1;
             this.vehicleData[index2] = prevData;
             vechile.total_no = vechile.total_no - 1;
             this.vehicleData[index] = vechile;
             // calculating the total time taken to find the falcon
             this.totalTime = this.totalTime - (this.findFalconForm.value.destination_1.distance / prevData.speed);
             this.totalTime = this.totalTime + (this.findFalconForm.value.destination_1.distance / vechile.speed);
           }
      } else {
        // find the index of selected vechile
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        // update the total number of vechile
        vechile.total_no = vechile.total_no - 1;
        // object of the array is replaced with updated vechile count
        this.vehicleData[index] = vechile;
        // updated time taken
        this.totalTime = this.totalTime + (this.findFalconForm.value.destination_1.distance / vechile.speed);
        console.log(this.totalTime);
      }
      this.vechile1PrevId = vechile.name;
    }
        // vechile2
    if (event.target.name === 'vehicle_name2') {
      if (this.vechile2PrevId !== undefined) {
           if (this.vechile2PrevId !== vechile.name) {
             const index = this.vehicleData.findIndex(item => item.name === vechile.name);
             const index2 = this.vehicleData.findIndex(item => item.name === this.vechile2PrevId);
             console.log(index, index2);
             const prevData = this.vehicleData[index2];
             prevData.total_no = prevData.total_no + 1;
             this.vehicleData[index2] = prevData;
             vechile.total_no = vechile.total_no - 1;
             this.vehicleData[index] = vechile;
             this.totalTime = this.totalTime - (this.findFalconForm.value.destination_2.distance / prevData.speed);
             this.totalTime = this.totalTime + (this.findFalconForm.value.destination_2.distance / vechile.speed);


           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime = this.totalTime + (this.findFalconForm.value.destination_2.distance / vechile.speed);
        console.log(this.totalTime);
      }
      this.vechile2PrevId = vechile.name;

    }
    // vehicle3
    if (event.target.name === 'vehicle_name3') {
      if (this.vechile3PrevId !== undefined) {
           if (this.vechile3PrevId !== vechile.name) {
             const index = this.vehicleData.findIndex(item => item.name === vechile.name);
             const index2 = this.vehicleData.findIndex(item => item.name === this.vechile3PrevId);
             console.log(index, index2);
             const prevData = this.vehicleData[index2];
             prevData.total_no = prevData.total_no + 1;
             this.vehicleData[index2] = prevData;
             vechile.total_no = vechile.total_no - 1;
             this.vehicleData[index] = vechile;
             this.totalTime = this.totalTime - (this.findFalconForm.value.destination_3.distance / prevData.speed);
             this.totalTime = this.totalTime + (this.findFalconForm.value.destination_3.distance / vechile.speed);
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime = this.totalTime + (this.findFalconForm.value.destination_3.distance / vechile.speed);
        console.log(this.totalTime);
      }
      this.vechile3PrevId = vechile.name;

    }
     // vehicle4
    if (event.target.name === 'vehicle_name4') {
      if (this.vechile4PrevId !== undefined) {
           if (this.vechile4PrevId !== vechile.name) {
             const index = this.vehicleData.findIndex(item => item.name === vechile.name);
             const index2 = this.vehicleData.findIndex(item => item.name === this.vechile4PrevId);
             console.log(index, index2);
             const prevData = this.vehicleData[index2];
             prevData.total_no = prevData.total_no + 1;
             this.vehicleData[index2] = prevData;
             vechile.total_no = vechile.total_no - 1;
             this.vehicleData[index] = vechile;
             this.totalTime = this.totalTime - (this.findFalconForm.value.destination_4.distance / prevData.speed);
             this.totalTime = this.totalTime + (this.findFalconForm.value.destination_4.distance / vechile.speed);
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
        this.totalTime = this.totalTime + (this.findFalconForm.value.destination_4.distance / vechile.speed);
        console.log(this.totalTime);
      }
      this.vechile4PrevId = vechile.name;

    }
  }
}
