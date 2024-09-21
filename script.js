const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('.tab-list__button');
const tabPanels = Array.from(tabs.querySelectorAll('.tab-panel'));

tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);

function handleTabClick(event) {
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  tabButtons.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  });

  event.currentTarget.setAttribute('aria-selected', true);

  const { id } = event.currentTarget;

  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute('aria-labelledby') === id
  );

  tabPanel.hidden = false;
}
