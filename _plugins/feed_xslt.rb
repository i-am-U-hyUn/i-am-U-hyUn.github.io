# jekyll-feed writes a raw Atom document with no stylesheet, so opening
# /feed.xml directly in a browser just shows the default "no style
# information" XML tree view. This hooks in after the site is written and
# points the feed at assets/feed.xsl so it renders as a styled page instead
# (RSS readers ignore the xml-stylesheet PI and parse the feed as normal).
Jekyll::Hooks.register :site, :post_write do |site|
  feed_path = File.join(site.dest, "feed.xml")
  next unless File.exist?(feed_path)

  content = File.read(feed_path)
  next if content.include?("xml-stylesheet")

  header = <<~XML
    <?xml version="1.0" encoding="utf-8"?>
    <?xml-stylesheet type="text/xsl" href="/assets/feed.xsl"?>
  XML

  File.write(feed_path, header + content)
end
