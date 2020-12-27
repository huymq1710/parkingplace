import React, { Component } from 'react';
import { CCard, CCardBody, CCardFooter, CCardHeader, CButton, CModal, CCol, CForm, CInput, CModalHeader, CModalBody, CFormGroup, CLabel, CInputCheckbox, CRow } from '@coreui/react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polygon } from 'google-maps-react';
import CIcon from "@coreui/icons-react";
import axios from "axios";

const mapStyles = {
  height: "650px",
  width: "97%",

};
const mapStyle_hideIcon = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
]
const MarkersList = props => {
  const { locations, ...markerProps } = props;
  return (
    <span>
      {locations.map((location, i) => {
        return (
          <Marker
            key={i}
            {...markerProps}
            position={{ lat: location.lat, lng: location.lng }}
          />
        );
      })}
    </span>
  );
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      parkingslot: [],
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {},
      filter: {
        electric: true,
        dike: true,
        agriculture: true
      }

    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }
  
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 5000);
  }
  getData = async () => {
    try {
      const locations = await axios.get(
        "/location"
      );
      const parkingslot = await axios.get(
        "/parkingslot"
      );
      var data = parkingslot.data
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        data[index]['slots'] = [parseInt(element.slots[0]),parseInt(element.slots[1]),parseInt(element.slots[2]),
        parseInt(element.slots[3]),parseInt(element.slots[4]),parseInt(element.slots[5]) ]    
      }
      console.log(parseInt(parkingslot.data[0].slots[2]))
      this.setState({
        locations: data,
        parkingslot: parkingslot.data
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }));
    map.panTo(location);
  };

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle_hideIcon
    })
  }
  setModalUploadForm = () => {
    this.setState({
      uploadForm: !this.state.uploadForm
    })
  }
  displayMarkers = (data) => {
    return data.map((poi, index) => {
      return <Marker Key={index} id={index} position={{
        lat: poi.lat,
        lng: poi.lng,
      }} slots = {poi.slots}

        onClick={this.onMarkerClick}
        name={poi.name}
        visible={true}    
      />
    })
  } 
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    console.log(this.state.selectedPlace.slots[0])
  }

  filterHandle = (event) => {
    // let filter = this.state.filter
    // switch (event.target.value) {
    //   case "electric":
    //     filter.electric = !filter.electric
    //     break
    //   case "dike":
    //     filter.dike = !filter.dike
    //     break
    //   case "agriculture":
    //     filter.agriculture = !filter.agriculture
    //     break
    // }

    // this.setState({
    //   filter: filter
    // })
    // console.log(this.state.filter)
  }
  render() {
    return (
      <CCard>
        <CCardHeader>
          {/* <h4 style={{ color: "blue" }}>Filter</h4>
          <CRow>
            <CCol>
              <CLabel>
                <b>Sự cố lưới điện</b>
                <input type="checkbox" value="electric" onChange={this.filterHandle} checked={this.state.filter.electric} />
              </CLabel>
            </CCol>
            <CCol>
              <CLabel>
                <b>Sự cố đê điều</b>
                <input type="checkbox" value="dike" onChange={this.filterHandle} checked={this.state.filter.dike} />
              </CLabel>
            </CCol>
            <CCol>
              <CLabel>
                <b>Sự cố nông nghiệp</b>
                <input type="checkbox" value="agriculture" onChange={this.filterHandle} checked={this.state.filter.agriculture} />
              </CLabel>
            </CCol>
          </CRow> */}

        </CCardHeader>
        <CCardBody >
          <div style={{ height: '650px' }}>
            <Map
              google={this.props.google}
              className={"map"}
              zoom={14}
              style={mapStyles}
              initialCenter={{ lat: 21.012651, lng: 105.843312 }}
              // initialCenter={{ lat: this.props.coordinate.lat, lng: this.props.coordinate.lng }}
              // onClick={this.handleMapClick}
              // onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
            >
              {this.displayMarkers(this.state.parkingslot)}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <CRow>
                  <CCol>
                    Name:{this.state.selectedPlace.name}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    Slot:{this.state.selectedPlace.slots?<div>
                      <input type="checkbox" checked={this.state.selectedPlace.slots[0]==1?true:false}/>
                    <input type="checkbox" checked={this.state.selectedPlace.slots[1]==1?true:false}/>
                    <input type="checkbox" checked={this.state.selectedPlace.slots[2]==1?true:false}/>
                    <input type="checkbox" checked={this.state.selectedPlace.slots[3]==1?true:false}/>
                    <input type="checkbox" checked={this.state.selectedPlace.slots[4]==1?true:false}/>
                    <input type="checkbox" checked={this.state.selectedPlace.slots[5]==1?true:false}/> 
                    </div>:""}
                    

                  </CCol>
                </CRow>
              </InfoWindow>

              {/* <MarkersList locations={this.state.locations}  /> */}
            </Map>
          </div>

        </CCardBody>
      </CCard>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8',
  libraries: []
})(Dashboard);