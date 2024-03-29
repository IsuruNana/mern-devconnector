import React, { Component } from 'react'
import { connect } from 'react-redux';
import Link from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile; 
    let profileContent;

    if(profile === null || loading) {
      profileContent = <Spinner />
    }
    else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-"/>
          </div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout />
          <ProfileCreds />
          <ProfileGithub />
        </div>
      );
    }
    
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);