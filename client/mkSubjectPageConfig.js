var mkPageLink = function(_id, text, actions){
  return {
    tag: 'a',
    href: '#',
    onclick: function(){
      var subjectID = _id;
      window.location.hash = '/' + subjectID;
      return false;
    },
    text: text
  };
};

export default function(state, actions){
  var subjectId = state.ui.selectedSubject;
  var subject = state.db[subjectId];

  var container = state.db[subject.containerId];
  if( !container ){
    container = {
      name: 'reality'
    };
  }


  var pageTitle = {
    tag: 'div',
    class: 'pageTitleBar',
    children: [
      {
        tag: 'h1',
        text: subject.name
      }
    ]
  };


  var mkInfoBox = function(){
    var infoBoxConfig = {
      tag: 'div',
      class: 'infoBox',
      children: [
        {
          tag: 'div',
          text: 'Type: ' + subject.type
        }
      ]
    };

    if(subject.info){
      console.log(subject.info);
      _.forIn(subject.info, function(value, name){
        infoBoxConfig.children.push({
          tag: 'div',
          text: _.upperFirst(name) +': '+ value
        });

      });
    }

    return infoBoxConfig;
  };

  var mkDescription = function(){
    var description = {
      tag: 'div',
      class: 'section descriptionSection',
      children: [
        subject.name,
        ' is a ',
        {
          tag: 'a',
          href: '#',
          //onclick: actions.selectSubject('l.type.' + subject.type),
          onclick: function(){
            console.log(subject.type);
          },
          text: subject.type
        },
        ', located in ',
        container.type,
        ' ',
        mkPageLink( container._id, container.name, actions),
        '. ',
        'It\'s catalog ID is: ',
        subject._id
      ]
    };

    return description;
  };

  var mkRaw = function(){
    var raw = {
      tag: 'div',
      class: 'section rawSection',
      children: [
        {
          tag: 'pre',
          text: JSON.stringify(subject, null, 4)
        }
      ]
    };

    return raw;
  };



  /**
   * var - Makes CDOM config object: List of contained locations.
   *
   * @return {object} config List of contained locations for current location subject
   */
  var mkContentList = function(){
    if( subject.contains.length === 0 ){
      return undefined;
    }

    var contentList = {
      tag: 'ul',
      class: 'section rawSection',
      children: [
      ]
    };

    subject.contains.forEach(function(containedSubjectID){
      contentList.children.push({
        tag: 'li',
        children: [
          state.db[containedSubjectID].type,
          ' ',
          mkPageLink( containedSubjectID, state.db[containedSubjectID].name, actions)
        ]
      });
    });

    return {
      tag: 'div',
      children: [
        {
          tag: 'div',
          text: `This ${subject.type} contains:`
        },
        contentList
      ]
    };
  };

  var mkPageContent = function(){
    var pageContent = {
      tag: 'div',
      class: 'pageBody',
      children: [
        mkInfoBox(),
        {
          tag: 'div',
          class: 'mainPageBody',
          children: [
            mkDescription(),
            mkContentList(),
            mkRaw()
          ]
        }
      ]
    };
    return pageContent;
  };

  var pageConfig = {
    tag: 'div',
    class: 'infoPage',
    children: [
      pageTitle,
      mkPageContent()
    ]
  };

  return pageConfig;
}
