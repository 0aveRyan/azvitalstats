<template>
  <Layout>
    <h1>Arizona Population Health & Vital Statistics</h1>

    <p>
    Scrapes Arizona Department of Health Services <strong><a href="https://pub.azdhs.gov/health-stats/mu/index.php">Population Health & Vital Statistics</a></strong> spreadsheets once a day, normalizes data and creates JSON feeds.
    </p>

    <g-link to="/about"><strong>Learn More</strong></g-link>

    <h2>All Data</h2>
    <span v-for="{ node } in $page.all.edges" :key="node.id">
      <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.fileInfo.name + '.json'">All available data</a>
    </span>
    <h2>Combined</h2>
    <ul>
      <li v-for="{ node } in $page.combined.edges" :key="node.id">
        <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.YEAR + '.json'">{{ node.YEAR }}</a>
      </li>
    </ul>
    <h2>Births</h2>
    <ul>
      <li v-for="{ node } in $page.births.edges" :key="node.id">
        <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.fileInfo.name + '.json'">{{ node.YEAR }}</a>
      </li>
    </ul>
    <h2>Deaths</h2>
    <ul>
      <li v-for="{ node } in $page.deaths.edges" :key="node.id">
        <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.fileInfo.name + '.json'">{{ node.YEAR }}</a>
      </li>
    </ul>
    <h2>Marriages</h2>
    <ul>
      <li v-for="{ node } in $page.mars.edges" :key="node.id">
        <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.fileInfo.name + '.json'">{{ node.YEAR }}</a>
      </li>
    </ul>
    <h2>Divorces</h2>
    <ul>
      <li v-for="{ node } in $page.divs.edges" :key="node.id">
        <a :href="stripPeriod(node.fileInfo.directory) + '/' + node.fileInfo.name + '.json'">{{ node.YEAR }}</a>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Home {
  all: allApi(
    perPage: 20
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["ALL"] } }
  ) {
    edges {
      node {
        id
        fileInfo {
          name
          directory
        }
      }
    }
  }
  combined: allApi(
    perPage: 20
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["COMBINED"] } }
  ) {
    edges {
      node {
        id
        YEAR
        fileInfo {
          directory
        }
      }
    }
  }
  births: allApi(
    perPage: 1000
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["BIRTHS"] } }
  ) {
    edges {
      node {
        id
        TYPE
        YEAR
        NOTES
        fileInfo {
          name
          directory
        }
      }
    }
  }
  deaths: allApi(
    perPage: 1000
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["DEATHS"] } }
  ) {
    edges {
      node {
        id
        TYPE
        YEAR
        NOTES
        fileInfo {
          name
          directory
        }
      }
    }
  }
  mars: allApi(
    perPage: 1000
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["MARS"] } }
  ) {
    edges {
      node {
        id
        TYPE
        YEAR
        NOTES
        fileInfo {
          name
          directory
        }
      }
    }
  }
  divs: allApi(
    perPage: 1000
    sortBy: "YEAR"
    order: DESC
    filter: { TYPE: { in: ["DIVS"] } }
  ) {
    edges {
      node {
        id
        TYPE
        YEAR
        NOTES
        fileInfo {
          name
          directory
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Arizona Vital Population Health Statistics'
  },
  methods: {
    stripPeriod( string ) {
      return string.replace('./static/', '');
    }
  }
}
</script>

<style>

</style>
