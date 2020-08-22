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
  updateVechileCount(vechile, event) {
    console.log(vechile, event.target.name);
    // vechile1
    if (event.target.name === 'vehicle_name1') {
      if (this.vechile1PrevId !== undefined) {
           if (this.vechile1PrevId !== vechile.name) {
             const index = this.vehicleData.findIndex(item => item.name === vechile.name);
             const index2 = this.vehicleData.findIndex(item => item.name === this.vechile1PrevId);
             console.log(index, index2);
             const prevData = this.vehicleData[index2];
             prevData.total_no = prevData.total_no + 1;
             this.vehicleData[index2] = prevData;
             vechile.total_no = vechile.total_no - 1;
             this.vehicleData[index] = vechile;
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
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
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
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
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
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
           }
      } else {
        const index = this.vehicleData.findIndex(item => item.name === vechile.name);
        console.log(index);
        vechile.total_no = vechile.total_no - 1;
        this.vehicleData[index] = vechile;
      }
      this.vechile4PrevId = vechile.name;

    }
  }
}
