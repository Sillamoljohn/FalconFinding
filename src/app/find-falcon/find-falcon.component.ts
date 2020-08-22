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
      destination_2: ["select"],
      destination_3: ["select"],
      destination_4: ["select"],
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
    console.log(this.findFalconForm.value.destination_1);

    if (this.findFalconForm.valid) {
      const planet_names = [];
      planet_names.push(
        this.findFalconForm.value.destination_1.name,
        this.findFalconForm.value.destination_2,
        this.findFalconForm.value.destination_3,
        this.findFalconForm.value.destination_4
      );
      const vehicle_names = [];
      vehicle_names.push(
        this.findFalconForm.value.vehicle_name1,
        this.findFalconForm.value.vehicle_name2,
        this.findFalconForm.value.vehicle_name3,
        this.findFalconForm.value.vehicle_name4
      );
      const postData = {
        token: localStorage.getItem("token"),
        planet_names,
        vehicle_names,
      };
      this.commonService.findFalcon(postData).subscribe((res: any) => {
        console.log(res);
        if (status == "success") {
          this.router.navigateByUrl(`success`);
        } else {
          this.router.navigateByUrl(`fail`);
        }
      });
    } else {
      alert("Something went wrong");
    }
  }
}
