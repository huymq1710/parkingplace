import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polygon } from 'google-maps-react';
import axios from "axios";
import { CCard, CCardBody, CCardFooter, CCardHeader, CButton, CModal, CCol, CForm, CInput, CModalHeader, CModalBody, CFormGroup, CLabel, CInputCheckbox, CRow } from '@coreui/react';

const mapStyles = {
  height: "400px",
  width: "96%",

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
            position={{ lat: location.lat(), lng: location.lng() }}
          />
        );
      })}
    </span>
  );
};
class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      incidents: [],
      electricPoles: [],
      dataelectric: [],
      dataagriculture: [],
      datadike: [],
      uploadForm: false,
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
    try {


      const incidents = await axios.get(
        "/incident/?code=8af3fed940fbd901b7471d0a47f2ad41aa8f6facfd6ff4ac262090e9ffdb719a"
      );
      const poles = await axios.get(
        "/electricpoles/?code=4c7a109e9e897bd5f0842b2a9bf5f16bef66ba434d569b5c3ca73a16d1e17d65"
      );
      this.setState({
        incidents: incidents.data,
        electricPoles: poles.data
      })
      console.log(this.state.incidents)
      console.log(this.state.electricPoles)
      var arr = this.state.incidents
      var arr1 = this.state.electricPoles
      
      // for (let index = 0; index < arr.length; index++) {
      //   const element = arr[index];

      //   var idpole = element['employeeandpole']['idpole']
      //   for (let index1 = 0; index1 < arr1.length; index1++) {
      //     const pole = arr1[index1];
      //     if (idpole == pole['_id']) {
      //       arr3.push(
      //         {
      //           name: element['name'],
      //           type: element['type'],
      //           level: element['level'],
      //           status: element['status'],
      //           lat: pole['pole_Latitude'],
      //           lng: pole['pole_Longitude'],
      //           description: pole['description']
      //         }
      //       )
      //     }
      //   }

      // }
      var dataelectric = [
        {
          name: 'Sự cố chuỗi sứ 001',
          type: 'electric',
          level: '3',
          status: 'wait',
          lat: 21.005145,
          lng: 105.845817 ,
          description: 'Chuỗi sứ bị nứt'
        },
        {
          name: 'Sự cố dây điện 001',
          type: 'electric',
          level: '2',
          status: 'successful',
          lat: 21.004121,
          lng: 105.841168 ,
          description: 'Dây điện bị chập'
        },
        {
          name: 'Sự cố chuỗi sứ 002',
          type: 'electric',
          level: '4',
          status: 'successful',
          lat: 21.008431,
          lng: 105.839101 ,
          description: 'Chuỗi sứ bị vỡ'
        },
      ]
      var datadike = [
        {
          name: 'Sự cố đê Nguyễn Khoái 001',
          type: 'dike',
          level: '2',
          status: 'successful',
          lat: 21.014308,
          lng: 105.863181 ,
          description: 'Đê nứt'
        },
        {
          name: 'Sự cố đê Nguyễn Khoái 002',
          type: 'dike',
          level: '2',
          status: 'successful',
          lat: 21.004953,
          lng: 105.872858,
          description: 'Đê nứt'
        }
      ]
      var dataagriculture = [
        {
          name: 'Sự cố nông nghiệp 001',
          type: 'agriculture',
          level: '3',
          status: 'wait',
          lat: 20.991385,
          lng: 105.856533 ,
          description: 'Sự cố ruộng rau muống Hoàng Mai'
        },
        {
          name: 'Sự cố nông nghiệp 002',
          type: 'agriculture',
          level: '2',
          status: 'successful',
          lat: 21.352327,
          lng: 105.354338 ,
          description: 'Sự cố ruộng Việt Trì'
        }
      ]
      this.setState({
        dataelectric: dataelectric,
        dataagriculture:dataagriculture,
        datadike:datadike,
      })
      console.log("1")
      console.log(this.state.data)
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
      }}
        onClick={this.onMarkerClick}
        name={poi.name}
        type={poi.type}
        level={poi.level}
        status={poi.status}
        description={poi.description}
        visible={true}
        icon={poi.type=='electric'?'icons/electric1.png':(poi.type=='dike'?'icons/dike1.png':'icons/agri1.png')}
      
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
    console.log(this.state.filter.electric)
  }

  filterHandle = (event) => {
    let filter = this.state.filter
    switch (event.target.value) {
      case "electric":
        filter.electric = !filter.electric
        break
      case "dike":
        filter.dike = !filter.dike
        break
      case "agriculture":
        filter.agriculture = !filter.agriculture
        break
    }

    this.setState({
      filter: filter
    })
    console.log(this.state.filter)
  }
  render() {
    return (
      <CCard>
        <CCardHeader>
          <h4 style={{ color: "blue" }}>Filter</h4>
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
            <CCol>
              <CButton onClick={this.setModalUploadForm} color="primary">
                Upload file
          </CButton>
            </CCol>
          </CRow>




        </CCardHeader>
        <CCardBody >
          <div style={{ height: '400px' }}>
            <Map
              google={this.props.google}
              className={"map"}
              // clickableIcons={true}
              // centerAroundCurrentLocation={true}
              zoom={16}
              style={mapStyles}
              initialCenter={{ lat: 21.012651, lng: 105.843312 }}
              // onClick={this.handleMapClick}
              onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
            >
              {this.state.filter.electric ? this.displayMarkers(this.state.dataelectric) : null}
              {this.state.filter.dike ? this.displayMarkers(this.state.datadike) : null}
              {this.state.filter.agriculture ? this.displayMarkers(this.state.dataagriculture) : null}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>Name:{this.state.selectedPlace.name}</h4>
                  <h4>Description:{this.state.selectedPlace.description}</h4>
                  <h4>Type:{this.state.selectedPlace.type}</h4>
                  <h4>Status:{this.state.selectedPlace.status}</h4>
                  <h4>Level:{this.state.selectedPlace.level}</h4>
                </div>
              </InfoWindow>

              <MarkersList locations={this.state.locations} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
            </Map>
          </div>

        </CCardBody>
        <CCardBody>
          <CModal show={this.state.uploadForm} onClose={this.setModalUploadForm}>
            <CForm onSubmit={console.log("1")}>
              <CModalHeader> Upload map json</CModalHeader>
              <CModalBody>
                <CFormGroup>
                  <CLabel> Chon file</CLabel>
                  <CInput type="file" accept=".json" />
                </CFormGroup>
              </CModalBody>
            </CForm>
          </CModal>
        </CCardBody>
        <CCardFooter>
          Footer
        </CCardFooter>
      </CCard>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8',
  libraries: []
})(MapContainer);
// AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8