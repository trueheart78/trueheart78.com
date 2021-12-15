---
layout: default
permalink: /blog/
pagination:
  enabled: true
---
<div class="home">
  <header class="post-header">
    <h1 class="post-title"><img class="emoji" title=":open_book:" alt=":open_book:" src="/assets/images/emoji/unicode/1f4d6.png" width="32" height="32"> My Blog</h1>
  </header>
  <ul class="post-list">
    {% for post in paginator.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>

  {% if paginator.total_pages > 1 %}
  <p>
    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path | prepend: site.baseurl }}">⏮️ Newer Posts</a>
    {% endif %}
    {% if paginator.next_page %}
      {% if paginator.previous_page %}
      / 
      {% endif %}
      <a href="{{ paginator.next_page_path | prepend: site.baseurl }}">Older Posts ⏭️</a>
    {% endif %}
  </p>
  {% endif %}

  <p class="rss-subscribe">📰 Subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
</div>
